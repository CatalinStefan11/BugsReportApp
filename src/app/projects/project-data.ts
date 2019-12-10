import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Project } from './project';
import { User2 } from '../user/user2';

export class ProjectData implements InMemoryDbService {

  createDb() {
    const projects: Project[] = [
      {
        id: 1,
        projectName: 'Patronii1',
        projectRepo: "maxum.repo",
        description: 'repo',
      },
      {
        id: 2,
        projectName: 'Patronii2',
        projectRepo: "maxum.repo",
        description: 'repo',
      },
      {
        id: 3,
        projectName: 'Patronii3',
        projectRepo: "maxum.repo",
        description: 'repo',
      },
      {
        id: 4,
        projectName: 'Patronii4',
        projectRepo: "maxum.repo",
        description: 'repo',
      },
      {
        id: 5,
        projectName: 'Patronii5',
        projectRepo: "maxum.repo",
        description: 'repo',
      }
    ];
    const users: User2[] = [
      {
        id: 1,
        userName: 'Beirut@maxum.com',
        password: "1234",
      },
      {
        id: 2,
        userName: 'Beirut@asdf.com',
        password: "1234",
      },
      {
        id: 3,
        userName: 'Beirut@gmail.com',
        password: "5679",
      },
      {
        id: 4,
        userName: 'Beirut',
        password: "1234",
      },
      {
        id: 5,
        userName: 'Beirut',
        password: "1234",
      }
    ];
    return { projects, users};

  }
}
