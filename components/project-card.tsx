import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Project } from "@/types/entities/project";
import { Play } from "lucide-react";

type ProjectCardProps = {
  project: Project;
  onClick?: () => void;
  selected?: boolean;
};

export function ProjectCard({ project, onClick, selected }: ProjectCardProps) {
  return (
    <Card
      className={`relative mx-auto w-full max-w-sm pt-0 h-full cursor-pointer transition-transform duration-200 ${selected ? "ring-2 ring-primary shadow-xl" : ""}`}
      onClick={onClick}
    >
      <img
        src="https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.webp"
        alt={project.title}
        className="relative z-20 aspect-video w-full object-cover h-32"
      />
      <CardHeader>
        <CardAction>
          <Button variant="outline" size="sm">
            <Play className="!size-4" />
          </Button>
        </CardAction>
        <CardTitle>{project.title}</CardTitle>
        <CardDescription className="truncate whitespace-nowrap overflow-hidden">
          {project.description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
