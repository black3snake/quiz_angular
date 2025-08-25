import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {QuizListType} from "../../../types/quiz-list.type";
import {TestResultType} from "../../../types/test-result.type";
import {DefaultResponseType} from "../../../types/default-response.type";
import {QuizType} from "../../../types/quiz.type";
import {PassTestResponseType} from "../../../types/pass-test-response.type";
import {UserResultType} from "../../../types/user-result.type";

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient) { }

  getTests(): Observable<QuizListType[]> {
    return this.http.get<QuizListType[]>(environment.apiHost + 'tests')
  }

  getUserResults(userId: number): Observable<TestResultType[] | DefaultResponseType> {
    return this.http.get<TestResultType[] | DefaultResponseType>(environment.apiHost + 'tests/results?userId=' +  userId)
  }

  getQuiz(id: number | string): Observable<QuizType | DefaultResponseType> {
    return this.http.get<QuizType | DefaultResponseType>(environment.apiHost + 'tests/' + id)
  }

  passQuiz(id: number | string, userId: number | string, userResult: UserResultType[]): Observable<PassTestResponseType | DefaultResponseType> {
    return this.http.post<PassTestResponseType | DefaultResponseType>(environment.apiHost + 'tests/' + id + '/pass', {
      userId: userId,
      results: userResult
    })
  }

  getResult(id: number | string, userId: number | string): Observable<PassTestResponseType | DefaultResponseType> {
    return this.http.get<PassTestResponseType | DefaultResponseType>(environment.apiHost + 'tests/' + id +'/result?userId=' + userId)
  }

}
