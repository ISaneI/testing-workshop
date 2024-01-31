import { render, screen } from '@testing-library/angular';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from '../hero.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('TimescalesEditorComponent', () => {
  // TODO: remove once the others are working!!
  test('should have a test case', async () => {
    await render(HeroDetailComponent, {
      providers: [HeroService, HttpClient, HttpHandler],
    });
  });
});
