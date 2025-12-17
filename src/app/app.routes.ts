import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { BuyOrders } from './buy-orders/buy-orders';
import { Warehouse } from './warehouse/warehouse';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: Dashboard },
    { path: 'buy-orders', component: BuyOrders },
    { path: 'warehouse', component: Warehouse },
];
