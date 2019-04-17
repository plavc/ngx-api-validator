import { Injectable } from '@angular/core';

import { TSAPIValidator } from '@plavc/ts-api-validator/src/ts-api-validator'
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap, catchError, mergeMap } from 'rxjs/operators';
import { TSAPIValidatorResult } from '@plavc/ts-api-validator/src/ts-api-validator-result';
import { NgxApiValidatorModule } from './ngx-api-validator.module';

@Injectable({
  providedIn: NgxApiValidatorModule
})
export class NgxApiValidatorService {

  public readonly validator = new TSAPIValidator();

  constructor(private http: HttpClient) { }

  public validate(schemaUrl: string, jsonToValidate: any): Observable<TSAPIValidatorResult> {
    return this.loadSchema(schemaUrl).pipe(
      map(res => {
        console.log(res);
        return this.validator.validate(jsonToValidate, res);
      }),
      catchError(error => of(new TSAPIValidatorResult(false, error)))
    );
  }

  public validateObservable(schemaUrl: string, jsonObservable: Observable<any>): Observable<TSAPIValidatorResult> {
    return this.loadSchema(schemaUrl).pipe(
      mergeMap(val => jsonObservable,
        (schema, json) => {
          return this.validator.validate(json, schema);
        }
      )
    );
  }

  public loadSchema(schemaUrl: string): Observable<object> {
    return this.http.get(schemaUrl);
  }
}
