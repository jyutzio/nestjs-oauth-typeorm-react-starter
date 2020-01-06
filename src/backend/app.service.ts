import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  routes(): string {
    return `
    <ul>
      <li><a href="/public">Public Route</a></li>
      <li><a href="/private">Private Route</a></li>
    </ul
    `;
  }

  publicRoute(): string {
    return 'Public Route';
  }
  privateRoute(): string {
    return 'Private Route';
  }
}
