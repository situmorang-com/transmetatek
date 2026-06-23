-- Cleanup script: Keep only the latest submission per email and per phone
-- This removes all but the most recent submission for duplicate emails/phones

-- Step 1: Show what will be deleted (for verification)
SELECT id, email, phone, firstName, lastName, createdAt,
       ROW_NUMBER() OVER (PARTITION BY email ORDER BY createdAt DESC) as email_rank,
       ROW_NUMBER() OVER (PARTITION BY phone ORDER BY createdAt DESC) as phone_rank
FROM builder_applications
WHERE email IN (SELECT email FROM builder_applications GROUP BY email HAVING COUNT(*) > 1)
   OR phone IN (SELECT phone FROM builder_applications GROUP BY phone HAVING COUNT(*) > 1)
ORDER BY email, createdAt DESC;

-- Step 2: Delete older duplicates (keeps only the most recent for each email/phone)
-- First, delete duplicates by email (keep the latest)
DELETE FROM builder_applications
WHERE id IN (
  SELECT id FROM (
    SELECT id,
           ROW_NUMBER() OVER (PARTITION BY email ORDER BY createdAt DESC) as rn
    FROM builder_applications
    WHERE email IN (SELECT email FROM builder_applications GROUP BY email HAVING COUNT(*) > 1)
  )
  WHERE rn > 1
);

-- Then, delete duplicates by phone (keep the latest)
DELETE FROM builder_applications
WHERE id IN (
  SELECT id FROM (
    SELECT id,
           ROW_NUMBER() OVER (PARTITION BY phone ORDER BY createdAt DESC) as rn
    FROM builder_applications
    WHERE phone IS NOT NULL
      AND phone IN (SELECT phone FROM builder_applications WHERE phone IS NOT NULL GROUP BY phone HAVING COUNT(*) > 1)
  )
  WHERE rn > 1
);

-- Step 3: Verify cleanup
SELECT 'Remaining builder applications:' as status;
SELECT COUNT(*) as total_applications FROM builder_applications;
SELECT 'Duplicates remaining:' as status;
SELECT email, COUNT(*) as count FROM builder_applications GROUP BY email HAVING COUNT(*) > 1;
SELECT phone, COUNT(*) as count FROM builder_applications WHERE phone IS NOT NULL GROUP BY phone HAVING COUNT(*) > 1;
