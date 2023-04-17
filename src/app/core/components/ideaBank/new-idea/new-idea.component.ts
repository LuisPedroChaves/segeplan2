import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Store, StoreConfig } from '@ngrx/store';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { IProduct, User } from 'src/app/core/models/adicionales';
import { GeneralInformation, PossibleAlternative, PossibleCause, PossibleEffect } from 'src/app/core/models/informationGeneral';
import { CLOSE_DRAWER1, OPEN_DRAWER1 } from 'src/app/core/store/actions';
import { AppState } from 'src/app/core/store/app.reducer';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-new-idea',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './new-idea.component.html',
  styleUrls: ['./new-idea.component.scss']
})
export class NewIdeaComponent {

  get formEffects(): FormArray {
    return this.generalInformation.get('possibleEffects') as FormArray;
  }

  get formCauses(): FormArray {
    return this.generalInformation.get('possibleCauses') as FormArray;
  }

  get formAlternatives(): FormArray {
    return this.generalInformation.get('possibleAlternatives') as FormArray;
  }

  generalInformation = new FormGroup({
    _product: new FormControl<string | IProduct>('', Validators.required),
    date: new FormControl('', Validators.required),
    planningInstrument: new FormControl(true, Validators.required),
    description: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    responsibleName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', Validators.required),
    possibleEffects: this.FormBuilder.array<PossibleEffect>([]),
    definitionPotentiality: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    possibleCauses: this.FormBuilder.array<PossibleCause>([]),
    baseLine: new FormControl('', [Validators.required]),
    descriptionCurrentSituation: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    generalObjective: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    expectedChange: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    possibleAlternatives: this.FormBuilder.array<PossibleAlternative>([]),
  });

  effectsColumns: string[] = ['description', 'remove'];
  effectsSource = new BehaviorSubject<AbstractControl[]>([]);

  causesColumns: string[] = ['description', 'remove'];
  causesSource = new BehaviorSubject<AbstractControl[]>([]);

  alternativesColumns: string[] = ['description', 'remove'];
  alternativesSource = new BehaviorSubject<AbstractControl[]>([]);

  products: IProduct[] = [];
  filteredProducts: Observable<IProduct[]>;
  productStoreSubscription = new Subscription();

  idea: GeneralInformation = null!
  ideaStoreSubscription = new Subscription();

  sessionSubscription: Subscription;
  usuario: User;

  constructor(
    private FormBuilder: FormBuilder,
    private appStore: Store<AppState>
  ) { }

  closeDrawer1(): void { this.appStore.dispatch(CLOSE_DRAWER1()) }

  changeDescription(event: MatSlideToggleChange): void {
    const description = this.generalInformation.get('description');

    if (event.checked) {
      description!.enable();
      return
    }

    description!.disable();
  }

  onSubmit(): void { }

}
