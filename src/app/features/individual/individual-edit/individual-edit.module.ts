import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
//import { IndividualEditRoutingModule } from './individual-edit-routing.module';
import { SharedModule } from '../../../theme/shared/shared.module'
import { IndividualEditComponent } from './individual-edit.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NgbModule,
  NgbDropdownModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import {
  NgbAccordionModule,
  NgbCollapseModule,
} from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
//import { NgxCurrencyModule } from 'ngx-currency';

//import { AngularDualListBoxModule } from 'angular-dual-listbox';
//import { TagInputModule } from 'ngx-chips';
//import { SelectModule } from 'ng-select';
import { SelectOptionService } from '../../../theme/shared/components/select/select-option.service';
//import { CustomFormsModule } from 'ngx-custom-validators';
import { CardComponent } from '../../../theme/shared/components/card/card.component';

@NgModule({
  declarations: [IndividualEditComponent, CardComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    //NgxCurrencyModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgxSpinnerModule,
    NgbAccordionModule,
    NgbCollapseModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgxSpinnerModule.forRoot(),
    //SelectModule,
    //CustomFormsModule,
  ],
  providers: [SelectOptionService],
})
export class IndividualEditModule {}