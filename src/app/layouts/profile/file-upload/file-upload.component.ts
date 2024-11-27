import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator} from '@angular/forms';


@Component({
  selector: 'file-upload',
  templateUrl: "file-upload.component.html",
  styleUrls: ["file-upload.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: FileUploadComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: FileUploadComponent
    }
  ]
})
export class FileUploadComponent implements ControlValueAccessor, Validator {
  @Input() requiredFileType: string;
  @Output() fileSelected = new EventEmitter<File>();

  fileName = '';
  fileUploadError = false;
  FileUploadSuccess = false;
  disabled: boolean = false;
  onChange = () => {
  }
  onTouched = () => {
  }
  constructor() {
  }

  onClick(fileUpload: HTMLInputElement) {
    this.onTouched();
    fileUpload.click();
  }

  writeValue(value: any) {
    this.fileName = value;
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  setDisabledState?(disabled: boolean) {
    this.disabled = disabled
  }

  registerOnValidatorChange() {
  }

  validate(): ValidationErrors | null {
    if (this.FileUploadSuccess) {
      return null;
    }
    let errors: any = {
      requiredFileType: this.requiredFileType
    }
    if (this.fileUploadError) {
      errors.uploadFailed = true;
    }

    return errors;
  }

  onFileSelected(event) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append('photo', file);
      this.fileUploadError = false;

      this.fileSelected.emit(file);

    }
  }
}
