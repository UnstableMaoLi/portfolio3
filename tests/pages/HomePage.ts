import { type Page, type Locator } from '@playwright/test';

export class HomePage {
  readonly heading: Locator;
  readonly viewProjectsLink: Locator;
  readonly contactLink: Locator;
  readonly aboutSection: Locator;
  readonly skillsCards: Locator;

  constructor(private readonly page: Page) {
    this.heading = page.getByRole('heading', { name: 'Tamara Korol', level: 1 });
    this.viewProjectsLink = page.getByRole('link', { name: 'View projects' });
    this.contactLink = page.getByRole('link', { name: 'Contact me' });
    this.aboutSection = page.locator('.about-section');
    this.skillsCards = page.locator('.skill-card');
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  async openProjects(): Promise<void> {
    await this.viewProjectsLink.click();
  }
}
