import HomeClient from "@/components/Home/HomeClient";
import { prisma } from "@/lib/prisma";

export interface ProjectData {
  id: number;
  title: string;
  titleFa: string | null;
  description: string;
  descriptionFa: string | null;
  imageUrl: string;
  tags: string[];
  githubUrl: string | null;
  liveUrl: string | null;
}

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const projects: ProjectData[] = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      titleFa: true,
      description: true,
      descriptionFa: true,
      tags: true,
      githubUrl: true,
      imageUrl: true,
      liveUrl: true,
    },
  });

  return <HomeClient projects={projects} />;
}