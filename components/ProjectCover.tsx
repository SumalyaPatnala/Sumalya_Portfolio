import Image from "next/image";
import { cn } from "@/lib/cn";
import type { Project } from "@/content/projects";

const aspectClass: Record<Project["aspect"], string> = {
  "4:5": "aspect-[4/5]",
  "3:4": "aspect-[3/4]",
  "16:9": "aspect-video",
};

export function ProjectCover({
  project,
  ratio,
  priority = false,
  className,
  sizes,
}: {
  project: Project;
  ratio?: Project["aspect"] | "cinematic";
  priority?: boolean;
  className?: string;
  sizes?: string;
}) {
  const frame =
    ratio === "cinematic"
      ? "aspect-[16/9] sm:aspect-[16/7]"
      : aspectClass[ratio ?? project.aspect];

  return (
    <div className={cn("relative overflow-hidden bg-bg-soft", frame, className)}>
      <Image
        src={project.cover}
        alt={project.coverAlt}
        fill
        sizes={
          sizes ??
          "(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 33vw"
        }
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] group-focus-within:scale-[1.04] motion-reduce:transform-none motion-reduce:transition-none"
        priority={priority}
      />
    </div>
  );
}
