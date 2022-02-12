import { Component, OnInit, AfterViewInit, Input  } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-cal-modal',
  templateUrl: './cal-modal.page.html',
  styleUrls: ['./cal-modal.page.scss'],
})
export class CalModalPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    this.showData();
  }

  /**
   * 
   * actividad : "Manejo de plagas",
      tipoActividad : "Otras Actividades de Ciclo y Cuidados culturales",
      faselunar : "Luna Nueva",
      descripcion : "El manejo de plagas y principalmente en su fase de desarrollo de huevo y larva, es una actividad forestal que se debe observar y practicar durante todo el año y principalmente en luna nueva, el gusano está en su fase de huevo y larva, tiempo ideal para eliminarla, ya que al alcanzar la etapa de madurez, combinado con la luna de cuarto creciente y luna llena, la plaga encontrará los mejores nutrientes en la planta o árbol para su desarrollo y consecuentemente dificultará su control. ", 
      fechainicio: "31/12/2021",
      fechaoptima: "02/01/2022",
      fechafin: "04/01/2022",
      nombreEpoca : "FRÍO",
      nombreTiempo : "SEQUIA",
      nombreCicloArbol :"2do Ciclo Masculino del Árbol",
      nombreCambio: "SOLSTICIO",
      nombreCuatrimestre : "PRIMER CUATRIMESTRE"
   */

  @Input() actividad: string;
  @Input() tipoActividad: string;
  @Input() descripcion: string;
  @Input() fechaoptima: string;
  @Input() nombreFaseLunar: string;
  @Input() nombreEpoca: string;
  @Input() nombreTiempo: string;
  @Input() nombreCicloArbol: string;
  @Input() nombreCambio: string;
  @Input() nombreCuatrimestre: string;

  viewTitle: string;

  showData(){
    this.viewTitle = this.actividad;
    console.log("DATROOOOOS")
    console.log(this.actividad);
    console.log(this.tipoActividad);
    console.log(this.descripcion);
    console.log(this.fechaoptima);
    console.log(this.nombreFaseLunar);
    console.log(this.nombreEpoca);
    console.log(this.nombreTiempo);
    console.log(this.nombreCicloArbol);
    console.log(this.nombreCambio);
    console.log(this.nombreCuatrimestre);
  }

  calendar = {
    mode: 'month',
    currentDate: new Date()
  };

  event = {
    title: '',
    desc: '',
    startTime: null,
    endTime: '',
    allDay: true
  };

  modalReady = false;


  //Metodos modal

  ngAfterViewInit() {
    setTimeout(() => {
      this.modalReady = true;      
    }, 0);
  }

  onViewTitleChanged(title) {
    this.viewTitle = "viewTitle";
  }

  onTimeSelected(ev) {    
    this.event.startTime = new Date(ev.selectedTime);
  }

  close() {
    this.modalCtrl.dismiss();
  }

}
