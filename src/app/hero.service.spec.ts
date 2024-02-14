import { render, } from '@testing-library/angular';

import { MockBuilder, MockInstance } from 'ng-mocks'
import { of } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeroService } from './hero.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { MessageService } from './message.service';

const heroesUrl = 'api/heroes';  // URL to web api

describe('HeroService', () => {
  MockInstance.scope()

  let httpClient: HttpTestingController;

  beforeEach(async () => {
    await MockBuilder(HeroService).replace(
      HttpClientModule,
      HttpClientTestingModule
    ).mock(MessageService);

    httpClient = TestBed.inject(HttpTestingController)
  })

  afterEach(() => {
    httpClient.verify();
  });

  test('getHero calls correct url', (done) => {
    const service = TestBed.inject(HeroService);
    const heroId = 1

    service.getHero(heroId).subscribe(() => { done() })

    const req = httpClient.expectOne(
      `${heroesUrl}/${heroId}`
    );
    req.flush({ id: heroId, name: 'Dr. Nice' })
  })

  test('getHero adds log message', (done) => {
    const service = TestBed.inject(HeroService);
    const messageService = TestBed.inject(MessageService)
    jest.spyOn(messageService, 'add')

    const heroId = 1

    service.getHero(heroId).subscribe(() => { done() })

    httpClient.expectOne(
      () => true).flush({ id: heroId, name: 'Dr. Nice' });

    expect(messageService.add).toHaveBeenCalledTimes(1)
    expect(messageService.add).toHaveBeenCalledWith("HeroService: fetched hero id=1")
  })



  test('get last hero message', () => {
    const message = "HERO"
    MockInstance(MessageService, 'getLastMessage', () => message)

    const service = TestBed.inject(HeroService);
    const lastMessage = service.getLastHeroMessage()

    expect(lastMessage).toBe(message)
  })

});
