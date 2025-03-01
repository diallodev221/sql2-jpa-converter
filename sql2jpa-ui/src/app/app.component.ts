import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppService } from './app.service';
import { HttpClientModule } from '@angular/common/http';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { JpaOutputComponent } from './components/jpa-output/jpa-output.component';
import { SqlInputComponent } from './components/sql-input/sql-input.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HowItWorksComponent,
    FooterComponent,
    HeaderComponent,
    JpaOutputComponent,
    SqlInputComponent,
    FormsModule,
    HttpClientModule,
  ],
  providers: [AppService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'SQL to JPA Entity Converter';

  sqlInput: string = '';
  jpaOutput: string = '';
  conversionOptions: any = {
    lombok: true,
    gettersSetters: false,
    constructors: true,
    jpaAnnotations: true,
    includeImports: true,
    relationships: true,
  };
  isLoading: boolean = false;

  onSqlInputChanged(sql: string): void {
    this.sqlInput = sql;
  }

  onOptionsChanged(options: any): void {
    this.conversionOptions = options;
  }

  onConversionCompleted(jpa: string): void {
    this.jpaOutput = jpa;
    this.isLoading = false;
  }

  setLoading(loading: boolean): void {
    this.isLoading = loading;
  }
}
