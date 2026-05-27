import { type Page, type Locator } from '@playwright/test';

export class ProjectsPage {
  readonly heading: Locator;
  readonly cards: Locator;
  readonly searchInput: Locator;
  readonly categorySelect: Locator;
  readonly resultCount: Locator;
  readonly selectedProject: Locator;

  constructor(private readonly page: Page) {
    this.heading = page.getByRole('heading', { name: 'Projects', level: 1 });
    this.cards = page.locator('article.project-card');
    this.searchInput = page.getByPlaceholder('Enter project name or tag...');
    this.categorySelect = page.getByLabel('Category');
    this.resultCount = page.locator('.result-count');
    this.selectedProject = page.locator('.selected-project');
  }

  async goto(): Promise<void> {
    await this.page.goto('/#/projects');
  }

  async searchProject(text: string): Promise<void> {
    await this.searchInput.fill(text);
  }

  projectCard(titleText: string): Locator {
    return this.cards.filter({ hasText: titleText });
  }

  async showDetails(titleText: string): Promise<void> {
    await this.projectCard(titleText).getByRole('button', { name: 'Details' }).click();
  }
}
