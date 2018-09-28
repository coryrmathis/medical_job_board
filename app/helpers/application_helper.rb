module ApplicationHelper
  # For Specialties Dropdown Placehold
  def specialties
    ["APP - Anesthesiology", "APP - Bariatric Surg", "APP - Breast Surg", "APP - CT Surgery", "APP - Cardiology", "APP - Critical Care", "APP - Dermatology", "APP - ENT", "APP - Emergency Medicine", "APP - Endocrinology", "APP - Family Medicine", "APP - Gastroenterology", "APP - General Surgery", "APP - Geriatrics", "APP - Gynecology", "APP - Hospitalist", "APP - Infectious Disease", "APP - Internal Medicine", "APP - Med/Peds", "APP - Midwife", "APP - Neonatal", "APP - Neurology", "APP - Neurosurg", "APP - OBGYN", "APP - Occupational Medici", "APP - Oncology", "APP - Orthopedics", "APP - Pain Management", "APP - Palliative Care", "APP - Pediatric", "APP - Physical Med Rehab", "APP - Psychiatry", "APP - Pulmonary", "APP - Radiology", "APP - Sleep", "APP - Trauma Surg", "APP - Unspecified", "APP - Urgent Care", "APP - Urology", "APP - Vascular Surg", "APP - Wound Care", "Addiction Medicine", "Administration", "Allergy & Immunology", "Anesthesiology", "Bariatric Surgery", "Breast Surgery", "CLEAR", "Cardiology", "Cardiothoracic Surgery", "Cardiovascular Surgery", "Colon & Rectal Surgery", "Critical Care", "Derm/MOHS", "Dermatology", "ENT", "EP Cardiology", "Emergency Medicine", "Endocrinology", "FP - Sports", "Family Medicine", "Family Medicine - Academic", "Family Medicine - Hospital", "Family Medicine - OB", "Family Medicine - Sleep", "Gastroenterology", "General Practice", "General Surgery", "General Surgery - MIS", "Geriatrics", "Gynecologic Oncology", "Gynecology", "Gynecology Surgery", "Hematology", "Hematology/Oncology", "Hepatology", "Hospitalist", "Hyperbarics - Wound Care", "IT Cardiology", "Infectious Disease", "Internal Medicine", "Internal Medicine - Academic", "Internal Medicine - Sleep", "Invasive Cardiology", "Jacks Job", "Maternal-Fetal Med", "Med/Peds", "Neonatology", "Nephrology", "Neuro - Stroke", "Neuroimaging", "Neurology", "Neurophysiology", "Neurosurgery", "OBGYN", "Occupational Medicine", "Oncology", "Ophthalmology", "Ortho - Foot & Ankle", "Ortho - Hand", "Ortho - Hip & Knee", "Ortho - Shoulder & Elbow", "Ortho - Spine", "Ortho - Sports", "Ortho - Total Joint", "Ortho - Trauma", "Orthopedic Surgery", "Pain Management", "Palliative Care", "Pathology", "Pediatric", "Peds - Anesthesiology", "Peds - Cardiology", "Peds - Critical Care", "Peds - EM", "Peds - ENT", "Peds - Endocrinology", "Peds - Gastroenterology", "Peds - Hem/Onc", "Peds - Infectious Disease", "Peds - Neurology", "Peds - Ophthamology", "Peds - Ortho Surg", "Peds - PM&R", "Peds - Psychiatry", "Peds - Pulmonary Med", "Peds - Surgery", "Physical Med & Rehab", "Plastic Surgery", "Psychiatry", "Psychiatry - Sleep", "Pulmonary/CC - Sleep", "Pulmonary/Critical Care", "Radiation Oncology", "Radiology", "Radiology - Breast", "Radiology - Diagnostic", "Radiology - Neuro", "Rheumatology", "Sleep", "Surgery - Oral/Maxillo", "Surgical Oncology", "Transplant Surgery", "Trauma Surgery", "Urgent Care", "Urogynecology", "Urology", "Vascular Surgery", "Wound Care", "Z - CLOSED"]
  end

  def format_date(date)
    if date.respond_to?(:strftime)
        return date.strftime("%-m/%-d/%Y")
    elsif date.class == String
        return Time.parse(date).strftime("%-m/%-d/%Y")
    else
        return nil
    end
  end

end
