import { PrismaClient } from "@prisma/client";

import asyncHandler from "../middleware/async.js";

const prisma = new PrismaClient();

export const getDepartments = asyncHandler(async (req, res) => {
  const departments = await prisma.department.findMany();
  res.status(200).json({ success: true, data: departments });
});

export const getDepartment = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const department = await prisma.department.findUnique({
    where: {
      id,
    },
  });

  if (!department) {
    return res.status(404).json({
      success: false,
      message: `Department not found`,
    });
  }

  return res.status(200).json({
    success: true,
    data: department,
  });
});

export const createDepartment = asyncHandler(async (req, res) => {
  const newDepartment = req.body;

  const department = await prisma.department.create({
    data: newDepartment,
  });
  res.json({
    success: true,
    data: department,
  });
});

export const updateDepartment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const departmentData = req.body;

  const department = await prisma.department.findUnique({
    where: {
      id,
    },
  });

  if (!department) {
    return res.status(404).json({
      success: false,
      message: `Department not found`,
    });
  }

  const updatedDepartment = await prisma.department.update({
    where: {
      id,
    },
    data: departmentData,
  });

  res.status(200).json({
    success: true,
    data: updatedDepartment,
  });
});

export const deleteDepartment = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const department = await prisma.department.findUnique({
    where: {
      id,
    },
  });

  if (!department) {
    return res.status(404).json({
      success: false,
      message: `Department not found`,
    });
  }

  await prisma.department.delete({
    where: {
      id,
    },
  });

  res
    .status(200)
    .json({ success: true, message: `Department deleted successfuly` });
});
