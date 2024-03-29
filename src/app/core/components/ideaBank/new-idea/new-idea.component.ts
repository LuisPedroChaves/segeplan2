import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import * as moment from 'moment';
import { IProduct, User } from 'src/app/core/models/adicionales';
import { GeneralInformation, PossibleCause, PossibleEffect } from 'src/app/core/models/informationGeneral';
import { CLOSE_DRAWER1, OPEN_DRAWER1, READ_PRODUCTS } from 'src/app/core/store/actions';
import { SharedModule } from 'src/app/shared/shared.module';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';
import { IdeaStore } from 'src/app/modules/idea-bank/store/reducers';
import { CREATE_IDEA } from 'src/app/modules/idea-bank/store/actions';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';

@Component({
  selector: 'app-new-idea',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './new-idea.component.html',
  styleUrls: ['./new-idea.component.scss']
})
export class NewIdeaComponent implements OnInit, OnDestroy {

  get formEffects(): FormArray {
    return this.step2.get('possibleEffects') as FormArray;
  }

  get formCauses(): FormArray {
    return this.step2.get('possibleCauses') as FormArray;
  }

  step1 = new FormGroup({
    _product: new FormControl<string | IProduct>('', Validators.required),
    date: new FormControl(moment(), Validators.required),
    planningInstrument: new FormControl(true, Validators.required),
    description: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    responsibleName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', Validators.required),
  })

  step2 = new FormGroup({
    possibleEffects: this.FormBuilder.array<PossibleEffect>([]),
    definitionPotentiality: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    possibleCauses: this.FormBuilder.array<PossibleCause>([]),
    baseLine: new FormControl('', [Validators.required]),
    descriptionCurrentSituation: new FormControl('', [Validators.required, Validators.maxLength(200)]),
  })

  step3 = new FormGroup({
    generalObjective: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    expectedChange: new FormControl('', [Validators.required, Validators.maxLength(200)]),
  })

  effectsColumns: string[] = ['description', 'remove'];
  effectsSource = new BehaviorSubject<AbstractControl[]>([]);

  causesColumns: string[] = ['description', 'remove'];
  causesSource = new BehaviorSubject<AbstractControl[]>([]);

  alternativesColumns: string[] = ['description', 'remove'];
  alternativesSource = new BehaviorSubject<AbstractControl[]>([]);

  products: IProduct[] = [];
  filteredProducts: Observable<IProduct[]>;
  productStoreSubscription = new Subscription();

  sessionSubscription: Subscription;
  usuario: User;

  constructor(
    private FormBuilder: FormBuilder,
    private ideaStore: Store<IdeaStore>,
    private dialog: MatDialog,
    private snackBarService: SnackBarService
  ) { }

  ngOnInit(): void {

    this.sessionSubscription = this.ideaStore.select('session').subscribe(session => {
      this.usuario = session.session.usuario;
    });

    this.productStoreSubscription = this.ideaStore.select('product')
      .subscribe(state => {
        this.products = state.products;
      })
    this.ideaStore.dispatch(READ_PRODUCTS({ filtro: this.usuario ? this.usuario.id_inst : '' }))

  }

  ngOnDestroy(): void {
    this.sessionSubscription?.unsubscribe()
    this.productStoreSubscription?.unsubscribe()
  }

  closeDrawer1(): void { this.ideaStore.dispatch(CLOSE_DRAWER1()) }

  changeDescription(event: MatSlideToggleChange): void {
    const description = this.step1.get('description');

    if (event.checked) {
      description!.enable();
      return
    }

    description!.disable();
  }

  onSubmit(): void { }

  /* #region productos */
  selectedProduct(): string {
    const PRODUCT = this.step1.controls['_product'].value;
    return typeof PRODUCT === 'string' ? '' : PRODUCT?.nombre
  }
  /* #endregion */

  /* #region efectos */
  addEffect(): void {
    const NEW_DETAIL: FormGroup = this.FormBuilder.group({
      description: new FormControl('', Validators.required),
    });
    this.formEffects.push(NEW_DETAIL);

    this.effectsSource.next(this.formEffects.controls);
  }

  removeEffect(index: number): void {
    this.formEffects.removeAt(index);
    this.effectsSource.next(this.formEffects.controls);
  }
  /* #endregion */

  /* #region causas */
  addCauses(): void {
    const NEW_DETAIL: FormGroup = this.FormBuilder.group({
      description: new FormControl('', Validators.required),
    });
    this.formCauses.push(NEW_DETAIL);

    this.causesSource.next(this.formCauses.controls);
  }

  removeCauses(index: number): void {
    this.formCauses.removeAt(index);
    this.causesSource.next(this.formCauses.controls);
  }
  /* #endregion */

  saveGeneralInformation(viewDetails: boolean): void {

    const {
      _product,
      date,
      planningInstrument,
      description,
      responsibleName,
      email,
      phone,
    } = this.step1.value

    const {
      possibleEffects,
      definitionPotentiality,
      possibleCauses,
      baseLine,
      descriptionCurrentSituation,
    } = this.step2.value

    const {
      generalObjective,
      expectedChange,
    } = this.step3.value

    const idea: GeneralInformation = {
      productId: typeof _product === 'string' ? null : _product?.codigo,
      productName: typeof _product === 'string' ? null : _product?.nombre,
      date,
      planningInstrument,
      description,
      idEntity: this.usuario.id_inst,
      nameEntity: this.usuario.name_inst,
      responsibleName,
      email,
      phone,
      Effects: possibleEffects,
      definitionPotentiality,
      Causes: possibleCauses,
      baseLine,
      descriptionCurrentSituation,
      generalObjective,
      expectedChange,
      alternatives: [],
      author: this.usuario.id
    }

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: { title: 'Crear Idea', description: '¿Esta seguro que desea guardar los datos para crear una idea?', confirmation: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result === true) {
        // Code of Work
        this.ideaStore.dispatch(CREATE_IDEA({
          idea,
          viewDetails
        }))

        if (viewDetails) {
          this.ideaStore.dispatch(OPEN_DRAWER1({ width1: '80%', component1: 'IDEA_DETAILS' }))
        } else {
          this.ideaStore.dispatch(CLOSE_DRAWER1())
        }

        this.step1.reset({
          date: moment(),
          planningInstrument: true
        })
        this.step2.reset()
        this.step3.reset()
      }

      return;
    });
  }
}
