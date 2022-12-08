export class ChecklistItem {
  content: string;
  checked: boolean;
  static selected?: ChecklistItem = undefined;

  constructor(content: string, checked?: boolean) {
    this.content = content;
    this.checked = checked || false;
  }

  toString(): string {
    return `${this.content}${this.checked ? checkedSeparator : ''}`;
  }

  static convert(listItem: string): ChecklistItem {
    let checked = listItem.indexOf(checkedSeparator) !== -1;
    let content = checked ? listItem.slice(0, -checkedSeparator.length) : listItem;
    return new ChecklistItem(content, checked);

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

  select(item: ChecklistItem) {
    ChecklistItem.selected = item;
  }

  deselectAll() {
    ChecklistItem.selected = undefined;
  }

}

export const checkedSeparator = "#check";