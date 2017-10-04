//angular 
import {NgModule} from '@angular/core';

//material modules components used in this project
//should go here
import {
    MatToolbarModule, MdIconModule, MdTabsModule,
    MatMenuModule, MatCardModule, MdButtonModule,
    MatProgressSpinnerModule
} from '@angular/material';

@NgModule({
    imports: [
        MatToolbarModule, MdIconModule, MdTabsModule,
        MatMenuModule, MatCardModule, MdButtonModule,
        MatProgressSpinnerModule
    ],
    exports: [
        MatToolbarModule, MdIconModule, MdTabsModule,
        MatMenuModule, MatCardModule, MdButtonModule,
        MatProgressSpinnerModule
    ],
})
export class AppMateralModule { }