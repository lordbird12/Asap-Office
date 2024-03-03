import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { UserService } from 'app/core/user/user.service';
import { of, switchMap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CheckDepartmentGuard implements CanActivate {
    constructor(private userService: UserService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        // ดึงข้อมูล user จาก userService หรือที่เก็บข้อมูล user ไว้
        const user = this.userService.user;

        // เช็คเงื่อนไข user.department === 3
        if (user && user.position_id === '3') {
            return true; // อนุญาตให้เข้าถึง route
        } else {
            this.router.navigate(['/']); // ไม่อนุญาตให้เข้าถึง route และ redirect ไปยังหน้าหลัก
            return false;
        }
    }
}
