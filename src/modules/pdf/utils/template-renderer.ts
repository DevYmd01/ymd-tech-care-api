import * as fs from 'fs';
import * as path from 'path';
import * as Handlebars from 'handlebars';

export class TemplateRenderer {

    private static templateCache = new Map<string, Handlebars.TemplateDelegate>();

    /**
     * Register partial templates เช่น header footer
     */
    static registerPartials(partialsDir: string) {

        if (!fs.existsSync(partialsDir)) return;

        const files = fs.readdirSync(partialsDir);

        files.forEach(file => {
            const filePath = path.join(partialsDir, file);
            const name = path.basename(file, '.html');
            const content = fs.readFileSync(filePath, 'utf-8');

            Handlebars.registerPartial(name, content);
        });
    }

    /**
     * Load และ compile template (มี cache)
     */
    private static loadTemplate(templatePath: string) {

        if (this.templateCache.has(templatePath)) {
            return this.templateCache.get(templatePath)!;
        }

        const content = fs.readFileSync(templatePath, 'utf-8');
        const compiled = Handlebars.compile(content);

        this.templateCache.set(templatePath, compiled);

        return compiled;
    }

    /**
     * Render template ด้วย data
     */
    static render(templateName: string, data: any): string {

        const templatePath = path.join(
            process.cwd(),
            'src/modules/pdf/templates',
            `${templateName}.html`
        );

        const partialsDir = path.join(
            process.cwd(),
            'src/modules/pdf/templates/partials'
        );

        this.registerPartials(partialsDir);

        const template = this.loadTemplate(templatePath);

        return template(data);
    }
}
