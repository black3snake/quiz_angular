import {Component, OnInit} from '@angular/core';
import {TestService} from "../../../shared/services/test.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserInfoType} from "../../../../types/user-info.type";
import {AuthService} from "../../../core/auth/auth.service";
import {PassTestResponseType} from "../../../../types/pass-test-response.type";
import {DefaultResponseType} from "../../../../types/default-response.type";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  resultScore: string = '';
  constructor(private testService: TestService,private activatedRoute: ActivatedRoute,
              private router: Router, private authService: AuthService) {  }

  ngOnInit(): void {
    const userInfo: UserInfoType | null = this.authService.getUserInfo();
    if (userInfo) {
      this.activatedRoute.queryParams.subscribe(queryParams => {
        const id = queryParams['id'];
        if (id) {
          this.testService.getResult(id, userInfo.userId)
            .subscribe(result => {
              if (result) {
                if ((result as DefaultResponseType).error !== undefined) {
                  throw new Error((result as DefaultResponseType).message);
                }
                this.resultScore = (result as PassTestResponseType).score + '/' + (result as PassTestResponseType).total;
              }
            });
        }
      });
    }
  }


}
