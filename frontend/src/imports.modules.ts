import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, RouterOutlet } from "@angular/router";
import { ApiService } from "@generated/api.service";
import { DbService } from "@generated/db.service";

export const NG_MODULES = [
  RouterOutlet,
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
];

export const NG_PROVIDERS = [
  ApiService,
  DbService,
];