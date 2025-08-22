import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ChoiceComponent} from "./choice/choice.component";
import {TestComponent} from "./test/test.component";
import {ResultComponent} from "./result/result.component";
import {CorrectComponent} from "./correct/correct.component";

const routes: Routes = [
  {path: 'choice', component: ChoiceComponent},
  {path: 'test/:id', component: TestComponent},
  {path: 'result', component: ResultComponent},
  {path: 'correct', component: CorrectComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestRoutingModule { }
