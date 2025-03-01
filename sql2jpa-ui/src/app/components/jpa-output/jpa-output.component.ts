import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import hljs from 'highlight.js/lib/core';
import java from 'highlight.js/lib/languages/java';
import 'highlight.js/styles/github-dark.css';

hljs.registerLanguage('java', java);

@Component({
  selector: 'app-jpa-output',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './jpa-output.component.html',
  styleUrl: './jpa-output.component.css',
})
export class JpaOutputComponent implements OnChanges {
  @Input() jpaOutput: string = '';
  @Input() jpaEntityName: string = 'User';
  @Input() isLoading: boolean = false;

  copySuccess: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['jpaOutput'] && !changes['jpaOutput'].firstChange) {
      this.copySuccess = false;
    }
  }

  copyToClipboard(): void {
    if (!this.jpaOutput) return;

    navigator.clipboard.writeText(this.jpaOutput).then(() => {
      this.copySuccess = true;
      setTimeout(() => (this.copySuccess = false), 2000);
    });
  }

  highlightEntityCode = (entityCode: string): string => {
    return hljs.highlight(entityCode, { language: 'java' }).value;
  };

  getEntityName = (entityName: string): string => {
    return entityName.charAt(0).toUpperCase() + entityName.slice(1) + '.java';
  }
}
