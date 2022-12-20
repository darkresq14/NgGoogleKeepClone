export class ChecklistItem {
  content: string;
  checked: boolean;

  constructor(listItem: string) {
    this.checked = listItem.indexOf(checkedSeparator) !== -1;
    this.content = this.checked ? listItem.slice(0, -checkedSeparator.length) : listItem;
  }

  toString(): string {
    return `${this.content}${this.checked ? checkedSeparator : ''}`;
  }

  toggleCheck() {
    this.checked = !this.checked;
  }

  check() {
    this.checked = true;
  }

  uncheck() {
    this.checked = false;
  }
}

export const checkedSeparator = "#check";