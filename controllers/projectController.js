import { PrismaClient } from "@prisma/client";

import asyncHandler from "../middleware/async.js";

const prisma = new PrismaClient();

export const getProjects = asyncHandler(async (req, res) => {
  const projects = await prisma.project.findMany();
  res.status(200).json({
    success: true,
    data: projects,
  });
});

export const getProject = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const project = await prisma.project.findUnique({
    where: {
      id,
    },
  });

  if (!project) {
    return res.status(404).json({
      success: false,
      message: `Project with id: ${id} not found`,
    });
  }

  return res.status(200).json({
    success: true,
    data: project,
  });
});

export const createProject = asyncHandler(async (req, res) => {
  const newProject = req.body;

  const project = await prisma.project.create({
    data: newProject,
  });
  res.json({ success: true, data: project });
});

export const updateProject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const projectData = req.body;

  const project = await prisma.project.findUnique({
    where: {
      id,
    },
  });

  if (!project) {
    return res
      .status(404)
      .json({ success: false, message: `Project with id: ${id} not found` });
  }

  const updatedProject = await prisma.project.update({
    where: {
      id,
    },
    data: projectData,
  });
  res.status(200).json({ success: true, data: updatedProject });
});

export const deleteProject = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const project = await prisma.project.findUnique({
    where: {
      id,
    },
  });

  if (!project) {
    return res
      .status(404)
      .json({ success: false, message: `Project with id: ${id} not found` });
  }

  await prisma.project.delete({
    where: {
      id,
    },
  });
  res
    .status(200)
    .json({ success: true, message: `Project with id: ${id} deleted` });
});
