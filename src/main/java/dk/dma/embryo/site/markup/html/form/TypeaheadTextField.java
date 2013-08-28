/* Copyright (c) 2011 Danish Maritime Authority
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this library.  If not, see <http://www.gnu.org/licenses/>.
 */
package dk.dma.embryo.site.markup.html.form;

import java.util.List;

import org.apache.wicket.AttributeModifier;
import org.apache.wicket.behavior.AttributeAppender;
import org.apache.wicket.markup.html.form.TextField;
import org.apache.wicket.model.IModel;
import org.apache.wicket.model.Model;

import dk.dma.embryo.rest.util.TypeaheadDatum;
import dk.dma.embryo.site.behavior.TypeaheadAjaxBehavior;
import dk.dma.embryo.site.behavior.TypeaheadDataSource;

/**
 * 
 * @author Jesper Tejlgaard
 *
 * @param <T>
 * @param <D>
 */
public class TypeaheadTextField<T, D extends TypeaheadDatum> extends TextField<T> {

    private static final long serialVersionUID = 1938956927163519213L;

    private TypeaheadDataSource<D> dataSource;
    
    private String selector;
    
    private Model<String> urlModel = Model.of();
    
    private boolean autoInitialize = true;
    
    public TypeaheadTextField(String id, Class<T> type, TypeaheadDataSource<D> dataSource) {
        super(id, type);
        init(null, dataSource);
    }

    public TypeaheadTextField(String id, IModel<T> model, Class<T> type, TypeaheadDataSource<D> dataSource) {
        super(id, model, type);
        init(null, dataSource);
    }

    public TypeaheadTextField(String id, IModel<T> model, TypeaheadDataSource<D> dataSource) {
        super(id, model);
        init(null, dataSource);
    }

    public TypeaheadTextField(String id, TypeaheadDataSource<D> dataSource) {
        super(id);
        init(null, dataSource);
    }

    public TypeaheadTextField(String id, String selector, TypeaheadDataSource<D> dataSource) {
        super(id);
        init(null, dataSource);
    }

    @Override
    protected void onInitialize() {
        super.onInitialize();

        String jQuerySelector = "#" + getForm().getMarkupId() + " " + selector;

        TypeaheadAjaxBehavior<?> typeahead = null;
        @SuppressWarnings("rawtypes")
        List<TypeaheadAjaxBehavior> behaviors = getForm().getBehaviors(TypeaheadAjaxBehavior.class);
        for (TypeaheadAjaxBehavior<?> behavior : behaviors) {
            if (behavior.getJQuerySelector().equals(jQuerySelector)) {
                typeahead = behavior;
                break;
            }
        }

        if (typeahead == null) {
            typeahead = new TypeaheadAjaxBehavior<D>(jQuerySelector, dataSource, autoInitialize);
            getForm().add(typeahead);
        }

        urlModel.setObject(typeahead.getJsonUrl());
    }
    
    
    @Override
    protected void onBeforeRender() {
        super.onBeforeRender();
    }

    private void init(final String selector, final TypeaheadDataSource<D> dataSource) {
        this.dataSource = dataSource;

        this.selector = selector != null ? selector : ".typeahead-textfield";
        // Class name may not be typeahead only. https://github.com/twitter/typeahead.js/issues/71
        // Use typeahead-textfield
        add(new AttributeAppender("class", " typeahead-textfield"));
        add(AttributeModifier.replace("data-json", urlModel));
    }
    
    public TypeaheadTextField<T, D> autoInitialize(boolean auto){
        this.autoInitialize = auto;
        return this;
    }

}
