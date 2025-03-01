import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  Signal,
  WritableSignal,
  effect,
  signal,
} from '@angular/core';
import hljs from 'highlight.js/lib/core';
import java from 'highlight.js/lib/languages/java';
import 'highlight.js/styles/github-dark.css';

hljs.registerLanguage('java', java);

@Component({
  selector: 'app-entity-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './entity-preview.component.html',
  styleUrl: './entity-preview.component.css',
})
export class EntityPreviewComponent {
  @Input() entityCode: Signal<string> = signal('');

  highlightedCode: WritableSignal<string> = signal('');

  // constructor() {
  //   effect(
  //     () => {
  //       this.entityCode().forEach((entityCode) =>
  //         this.highlightedCode.set(
  //           hljs.highlight(entityCode, { language: 'java' }).value
  //         )
  //       );
  //     },
  //     { allowSignalWrites: true }
  //   );
  // }

  highlightEntityCode = (entityCode: string): string => {
    return hljs.highlight(entityCode, { language: 'java' }).value;
  };
}
