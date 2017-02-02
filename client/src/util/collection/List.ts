export class List<T> {
    
    private items: Array<T>;

    public constructor() {
        this.items = [];
    }

    public size(): number {
        return this.items.length;
    }

    public add(value: T): void {
        this.items.push(value);
    }

    public addAll(values: List<T>): void {
        for(var i=0; i<values.size(); i++) {
            this.items.push(values.get(i));
        }
    }

    public contains(value: T): boolean {
        var index = this.items.indexOf(value);
        return index != -1;
    }

    public get(index: number): T {
        return this.items[index];
    }

    public remove(value: T): void {
        var index = this.items.indexOf(value);
        if(index != -1) {
            this.items.splice(index, 1);
        }
    }

    public forEach(fn: (T) => any): void {
        for(var i=0; i<this.items.length; i++) {
            fn(this.items[i]);
        }
    }
}