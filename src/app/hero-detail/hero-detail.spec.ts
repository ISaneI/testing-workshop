import { render, } from '@testing-library/angular';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from '../hero.service';
import { MockBuilder, MockInstance } from 'ng-mocks'
import { of } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('TimescalesEditorComponent', () => {
  MockInstance.scope()

  beforeAll(() => MockInstance(HeroService, 'getHero', () => of({
    id: 0,
    name: 'cool Hero'
  })))

  beforeEach(() => MockBuilder(HeroDetailComponent).mock(FormsModule))
});
