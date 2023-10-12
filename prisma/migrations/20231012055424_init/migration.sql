-- CreateTable
CREATE TABLE "Emp_db" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "emp_name" TEXT NOT NULL,
    "emp_position" TEXT NOT NULL,
    "emp_age" TEXT NOT NULL,
    "emp_gender" TEXT NOT NULL,
    "emp_profile" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
