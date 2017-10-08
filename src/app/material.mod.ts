//angular 
import {NgModule} from '@angular/core';

//material modules components used in this project
//should go here
import {
    MatToolbarModule, MdIconModule, MdTabsModule,
    MatMenuModule, MatCardModule, MdButtonModule,
    MatProgressSpinnerModule, MatListModule,
    MatDialogModule, MatInputModule, MatSliderModule,
    MatDatepickerModule, MdNativeDateModule
} from '@angular/material';

@NgModule({
    imports: [
        MatToolbarModule, MdIconModule, MdTabsModule,
        MatMenuModule, MatCardModule, MdButtonModule,
        MatProgressSpinnerModule, MatListModule,
        MatDialogModule, MatInputModule, MatSliderModule,
        MatDatepickerModule, MdNativeDateModule
    ],
    exports: [
        MatToolbarModule, MdIconModule, MdTabsModule,
        MatMenuModule, MatCardModule, MdButtonModule,
        MatProgressSpinnerModule, MatListModule,
        MatDialogModule, MatInputModule, MatSliderModule,
        MatDatepickerModule, MdNativeDateModule
    ],
})
export class AppMateralModule { }