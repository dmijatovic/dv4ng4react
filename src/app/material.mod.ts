//angular 
import {NgModule} from '@angular/core';

//material modules components used in this project
//should go here
import {
    MatToolbarModule, MdIconModule, MdTabsModule,
    MatMenuModule, MatCardModule, MdButtonModule
} from '@angular/material';

@NgModule({
    imports: [
        MatToolbarModule, MdIconModule, MdTabsModule,
        MatMenuModule, MatCardModule, MdButtonModule
    ],
    exports: [
        MatToolbarModule, MdIconModule, MdTabsModule,
        MatMenuModule, MatCardModule, MdButtonModule
    ],
})
export class AppMateralModule { }