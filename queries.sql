-- Multi-Table Query Practice

-- Display the ProductName and CategoryName for all products in the database. Shows 77 records.
SELECT ProductName, CategoryName 
FROM Product as p 
JOIN Category as c 
ON p.CategoryId = c.Id;

-- Display the order Id and shipper CompanyName for all orders placed before August 9 2012. Shows 429 records.
SELECT Id, CompanyName, ShippedDate
FROM [Order] as o
JOIN Shipper as s
ON o.ShipVia = s.Id
WHERE o.ShippedDate < "2012-08-09"; 

-- Display the name and quantity of the products ordered in order with Id 10251. Sort by ProductName. Shows 3 records.
SELECT ProductName, Quantity
FROM OrderDetail as o
JOIN Product as p
ON p.Id = o.ProductId
WHERE o.OrderId = 10251
ORDER BY ProductName;

-- Display the OrderID, Customer's Company Name and the employee's LastName for every order. All columns should be labeled clearly. Displays 16,789 records.
SELECT Id as "ID", CompanyName as "Company Name", LastName as "Last Name"
FROM [Order] as o
JOIN Customer as c
ON o.CustomerId = c.Id
JOIN Employee as e
ON o.EmployeeId = e.Id;