import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SqlToJpaService } from '../../services/sql-to-jpa.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-sql-input',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [SqlToJpaService],
  templateUrl: './sql-input.component.html',
  styleUrl: './sql-input.component.css',
})
export class SqlInputComponent {
  @Input() sqlInput: string = '';
  @Input() isLoading: boolean = false;
  @Input() options: any = {};

  @Output() sqlChanged = new EventEmitter<string>();
  @Output() convertClicked = new EventEmitter<void>();
  @Output() optionsChanged = new EventEmitter<any>();
  @Output() conversionCompleted = new EventEmitter<string>();

  showOptions: boolean = false;
  optionsForm: FormGroup;

  sampleSql: string = `CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  active BOOLEAN DEFAULT TRUE
);`;

  constructor(
    private readonly fb: FormBuilder,
    private readonly sqlToJpaService: SqlToJpaService,
  ) {
    this.optionsForm = this.fb.group({
      lombok: [true],
      gettersSetters: [false],
      constructors: [true],
      jpaAnnotations: [true],
      includeImports: [true],
      relationships: [true],
    });
  }

  ngOnInit(): void {
    this.optionsForm.valueChanges.subscribe((values) => {
      this.optionsChanged.emit(values);
    });

    // Initialize form with input values
    this.optionsForm.patchValue(this.options);
  }

  onInputChange(event: any): void {
    this.sqlChanged.emit(event.target.value);
  }

  loadSample(): void {
    this.sqlChanged.emit(this.sampleSql);
  }

  clearAll(): void {
    this.sqlChanged.emit('');
  }

  toggleOptions(): void {
    this.showOptions = !this.showOptions;
  }

  convert(): void {
    if (!this.sqlInput.trim()) return;

    this.convertClicked.emit();

    this.sqlToJpaService
      .convertSqlToJpa(this.sqlInput, this.optionsForm.value)
      .subscribe((result) => {
        console.log(result);
        this.conversionCompleted.emit(result.map(res => res.entityCode).join('\n\n'));
      });
  }
}
