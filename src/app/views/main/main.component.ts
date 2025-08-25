import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../core/auth/auth.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  link: string = '';
  constructor(private authService: AuthService) {  }

  ngOnInit(): void {
    // Устанавливаем начальное значение
    this.link = this.authService.getLoggedIn() ? '/choice' : '/login';

    // Подписываемся на будущие изменения
    this.authService.isLogged$
      .subscribe(isLoggedIn => {
        this.link = isLoggedIn ? '/choice' : '/login';
      });
  }
}
