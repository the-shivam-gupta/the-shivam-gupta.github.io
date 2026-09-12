import {
  Code2,
  Sparkles,
  MousePointerClick,
  Zap,
  Database,
  Gauge,
  type LucideIcon,
} from "lucide-react";
import type { CapabilityIcon } from "@/data/capabilities";

// Single icon-key → component map, shared by every place that renders a
// capability's icon (Intro's inline chips, the Capabilities cards).
export const CAPABILITY_ICONS: Record<CapabilityIcon, LucideIcon> = {
  code: Code2,
  sparkles: Sparkles,
  cursor: MousePointerClick,
  zap: Zap,
  database: Database,
  gauge: Gauge,
};
