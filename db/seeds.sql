INSERT INTO departments(department_name)
VALUES
('Sales'),
('Engineering'),
('Finance'),
('Legal'),
('Human Resources');

INSERT INTO roles(job_title,department_id,salary)
VALUES
('Sales Manager',1,85000),
('Salesperson',1,55000),
('Lead Engineer',2,212000),
('Software Engineer',2,125000),
('Account Manager',3,155000),
('Accountant',3,100000),
('Legal Team Lead',4,265000),
('Lawyer',4,200000),
('Human Resources Lead',5,135000),
('Human Resources',5,65000);

-- INSERT INTO employees(first_name,last_name,job_title_id,manager)
-- VALUES
-- ('')
