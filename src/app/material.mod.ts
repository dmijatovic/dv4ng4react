//angular 
import {NgModule} from '@angular/core';

//material modules components used in this project
//should go here
import {
    MatToolbarModule, MdIconModule, MdTabsModule,
    MatMenuModule, MatCardModule, MdButtonModule,
    MatProgressSpinnerModule, MatListModule,
    MatDialogModule
} from '@angular/material';

@NgModule({
    imports: [
        MatToolbarModule, MdIconModule, MdTabsModule,
        MatMenuModule, MatCardModule, MdButtonModule,
        MatProgressSpinnerModule, MatListModule,
        MatDialogModule
    ],
    exports: [
        MatToolbarModule, MdIconModule, MdTabsModule,
        MatMenuModule, MatCardModule, MdButtonModule,
        MatProgressSpinnerModule, MatListModule,
        MatDialogModule
    ],
})
export class AppMateralModule { }