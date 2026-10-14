import { foundations } from './foundations'
import { identity } from './identity'
import { cloudRun } from './cloud-run'
import { networking } from './networking'
import { compute } from './compute'
import { storage } from './storage'
import { databases } from './databases'
import { events } from './events'
import { analytics } from './analytics'
import type { Course, Section } from './types'

// Course registry, in syllabus order. Courses are added here as each is authored.
export const COURSES: Record<string, Course> = {
  [foundations.id]: foundations,
  [identity.id]: identity,
  [cloudRun.id]: cloudRun,
  [networking.id]: networking,
  [compute.id]: compute,
  [storage.id]: storage,
  [databases.id]: databases,
  [events.id]: events,
  [analytics.id]: analytics,
}

export type { Course, Section }

// slugOf / allSections are the shell's — the slug rule (`<courseId>-<sectionId>`) is part of the
// route contract every recorder drives, so it cannot be a per-repo decision. Re-exported here
// because this module is what the app and the scripts import them from.
export { slugOf, allSections } from '@graphlearning/shell'

export function getCourse(id: string): Course | undefined {
  return COURSES[id]
}
