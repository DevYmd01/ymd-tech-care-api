import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { TemplateRenderer } from './utils/template-renderer';

@Injectable()
export class PdfService {

    async generateRFQ(data: any): Promise<Buffer> {

        console.log(data);

        const html = TemplateRenderer.render('rfq-th', data);
        // console.log(html);
        const browser = await puppeteer.launch({ headless: true });

        const page = await browser.newPage();

        await page.setContent(html, { waitUntil: 'networkidle0' });

        const pdf = await page.pdf({
            format: 'A4',
            printBackground: true,
        });

        await browser.close();

        return Buffer.from(pdf);
    }
}
