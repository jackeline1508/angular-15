import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Formulario } from './models/formulario';
import { FormularioService } from './services/formulario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  formulario = {} as Formulario;
  formularios: Formulario[] | undefined;
dtnascimento: any;
car: any;
nome: any;

  constructor(private formularioService: FormularioService) {}

  ngOnInit() {
    this.getFormularios();
  }

  // defini se um cadastro será criado ou atualizado
  saveFormulario(form: NgForm) {
    if (this.formulario.id !== undefined) {
      this.formularioService.updateFormulario(this.formulario).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.formularioService.saveFormulario(this.formulario).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  // Chama o serviço para obtém todos os cadastros
  getFormularios() {
    this.formularioService.getFormulario().subscribe((formularios: Formulario[]) => {
      this.formularios = formularios;
    });
  }

  // deleta um cadastro
  deleteFormularios(formulario: Formulario) {
    this.formularioService.deleteFormulario(formulario).subscribe(() => {
      this.getFormularios();
    });
  }

  // copia o cadastro para ser editado.
  editFormulario(formulario: Formulario) {
    this.formulario = { ...formulario };
  }

  // limpa o formulario
  cleanForm(form: NgForm) {
    this.getFormularios();
    form.resetForm();
    this.formulario = {} as Formulario;
  }

}
