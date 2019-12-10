import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Project } from './project';

export class ProjectData implements InMemoryDbService {

  createDb() {
    const projects: Project[] = [
      {
        id: 1,
        projectName: 'Patronii1',
        description: 'repo',
      },
      {
        id: 2,
        projectName: 'Patronii2',
        description: 'repo',
      },
      {
        id: 3,
        projectName: 'Patronii3',
        description: 'repo',
      },
      {
        id: 4,
        projectName: 'Patronii4',
        description: 'repo',
      },
      {
        id: 5,
        projectName: 'Patronii5',
        description: 'repo',
      }
    ];
    return { projects };

  }
}
