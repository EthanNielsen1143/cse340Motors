INSERT INTO account (first_name, last_name, email, password)
VALUES ('Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n');

UPDATE account
SET account_type = 'Admin'
WHERE first_name = 'Tony' AND last_name = 'Stark';

DELETE FROM account
WHERE first_name = 'Tony' AND last_name = 'Stark';

UPDATE inventory
SET description = REPLACE(description, 'small interiors', 'a huge interior')
WHERE model = 'GM Hummer';

UPDATE inventory
SET inv_image = REPLACE(inv_image, '/images', '/images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images', '/images/vehicles/');