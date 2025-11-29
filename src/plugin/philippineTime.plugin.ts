import { Schema } from "mongoose";

// Helper function to convert Date to Philippine Time (UTC+8)
export function toPhilippineTime(date: Date): Date {
    const utc = date.getTime() + date.getTimezoneOffset() * 60000; // convert to UTC
    return new Date(utc + 8 * 60 * 60 * 1000); // add 8 hours
}

// Mongoose plugin
export function philippineTimePlugin(schema: Schema) {
    // Pre-save hook
    schema.pre("save", function (next) {
        const doc: any = this;

        // Format all Date fields in schema
        schema.eachPath((path, type) => {
            if (type.instance === "Date" && doc[path]) {
                doc[path] = toPhilippineTime(doc[path]);
            }
        });

    });

    // Optionally, convert timestamps on document creation
    if (schema.options.timestamps) {
        schema.pre("save", function (next) {
            const doc: any = this;
            const now = new Date();
            if (doc.createdAt) doc.createdAt = toPhilippineTime(doc.createdAt);
            if (doc.updatedAt) doc.updatedAt = toPhilippineTime(doc.updatedAt);

        });
    }
}
