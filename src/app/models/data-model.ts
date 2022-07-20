export class AgentModel {
    eCode?: string;
    name?: string;
    dob?: string;
    gender?: string;
    phone?: number;
    department?: string;
    location?: string;
    month?: string;
}

export class TopicModel {
    name?: string;
    description?: string;
    articleCount?: number;
    articleTotalCount?: number;
    createdBy?: number;
    createdDate?: string;
    departmentId?: number;
    imageUrl?: string;
    isAssignable?: number;
    isDeleted?: number;
    isTranslatable?: number;
    lastModifiedBy?: number;
    lastModifiedDate?: string;
    startingId?: number;
    topicType?: number;
    parentTopicId?: number;
    childCount?: number;
    id?: number
}