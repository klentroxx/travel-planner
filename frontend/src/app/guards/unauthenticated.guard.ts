import { CanActivateFn, Router } from '@angular/router';
import { inject } from "@angular/core";
import { JwtStorageService } from "../local-storage/jwt-storage.service";

export const unauthenticatedGuard: CanActivateFn = (route, state) => {
  const jwtStorage = inject(JwtStorageService)
  const router = inject(Router)
  if (!jwtStorage.getItem()?.id) {
    return true
  } else {
    router.navigate(['/'])
    return false
  }
};
