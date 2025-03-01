import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthLayoutComponent } from "../auth-layout/auth-layout.component";
import { NavBlankComponent } from "../../Component/nav-blank/nav-blank.component";
import { FooterComponent } from "../../Component/footer/footer.component";

@Component({
  selector: 'app-blank-layout',
  standalone: true,
  imports: [RouterOutlet, AuthLayoutComponent, NavBlankComponent, FooterComponent],
  templateUrl: './blank-layout.component.html',
  styleUrl: './blank-layout.component.scss'
})
export class BlankLayoutComponent {

}
